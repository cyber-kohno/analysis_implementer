
export type ScanRequest = {
  rootPath: string;
  expectedDepth: number;
  limitDepth?: number;
  dirConds: DirCond[];
  fileConds: FileCond[];
};

export interface FileCond {
  pattern: string;
  isExclusion: boolean;
}
export interface DirCond extends FileCond {
  depth?: number;
}

export type ScanResponse = {
  result: string;
  node: PayloadNode;
};
export interface PayloadNode {
  name: string;
  children: null | PayloadNode[];
}

export type KeyValue = {
  key: string;
  value: string;
}

// export type ChannelType = 'root' | 'category' | 'item';