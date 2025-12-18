// src/utils/downloadTemplate.ts
export const downloadTemplate = (templatePath: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = templatePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};