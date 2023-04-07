export interface FileAsset {
  uri: string;
  type: string;
  name: string;
}

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  Decimal: number;
  Upload: File;
};

export type CoordinatesInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};
