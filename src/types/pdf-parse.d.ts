declare module "pdf-parse" {
  const pdf: (data: Buffer) => Promise<{
    text: string;
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
  }>;
  export default pdf;
}
