import { ApolloLink, Observable, FetchResult, Operation } from "@apollo/client";
import { print } from "graphql";

const isFile = (value: any): value is File => {
  return typeof File !== "undefined" && value instanceof File;
};

const isFileList = (value: any): value is FileList => {
  return typeof FileList !== "undefined" && value instanceof FileList;
};

const extractFiles = (
  variables: Record<string, any>,
  path: string = "variables"
): { variables: Record<string, any>; files: Map<string, File> } => {
  const files = new Map<string, File>();
  const newVariables: Record<string, any> = {};

  Object.entries(variables).forEach(([key, value]) => {
    const currentPath = `${path}.${key}`;

    if (isFile(value)) {
      files.set(currentPath, value);
      newVariables[key] = null;
    } else if (isFileList(value)) {
      newVariables[key] = [];
      Array.from(value).forEach((file, index) => {
        files.set(`${currentPath}.${index}`, file);
        newVariables[key].push(null);
      });
    } else if (Array.isArray(value)) {
      const result: any[] = [];
      value.forEach((item, index) => {
        if (isFile(item)) {
          files.set(`${currentPath}.${index}`, item);
          result.push(null);
        } else if (typeof item === "object" && item !== null) {
          const nested = extractFiles(item, `${currentPath}.${index}`);
          result.push(nested.variables);
          nested.files.forEach((file, filePath) => files.set(filePath, file));
        } else {
          result.push(item);
        }
      });
      newVariables[key] = result;
    } else if (typeof value === "object" && value !== null) {
      const nested = extractFiles(value, currentPath);
      newVariables[key] = nested.variables;
      nested.files.forEach((file, filePath) => files.set(filePath, file));
    } else {
      newVariables[key] = value;
    }
  });

  return { variables: newVariables, files };
};

const createUploadLink = (uri: string) => {
  return new ApolloLink((operation: Operation) => {
    return new Observable<FetchResult>((observer) => {
      const { variables } = operation;
      const { variables: extractedVariables, files } = extractFiles(
        variables || {}
      );

      // Common headers for all requests
      const commonHeaders: Record<string, string> = {
        "apollo-require-preflight": "true",
      };

      // If no files, use regular JSON request
      if (files.size === 0) {
        fetch(uri, {
          method: "POST",
          headers: {
            ...commonHeaders,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operationName: operation.operationName,
            query: print(operation.query),
            variables: operation.variables,
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            observer.next(result);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      } else {
        // Use multipart form data for file uploads
        const formData = new FormData();

        // Add operations
        const operations = {
          operationName: operation.operationName,
          query: print(operation.query),
          variables: extractedVariables,
        };
        formData.append("operations", JSON.stringify(operations));

        // Create file map
        const fileMap: Record<string, string[]> = {};
        let fileIndex = 0;
        files.forEach((_, path) => {
          fileMap[fileIndex.toString()] = [path];
          fileIndex++;
        });
        formData.append("map", JSON.stringify(fileMap));

        // Add files
        fileIndex = 0;
        files.forEach((file) => {
          formData.append(fileIndex.toString(), file);
          fileIndex++;
        });

        fetch(uri, {
          method: "POST",
          headers: {
            ...commonHeaders,
            // Don't set Content-Type for FormData - browser sets it automatically with boundary
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            observer.next(result);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      }
    });
  });
};

export default createUploadLink;
