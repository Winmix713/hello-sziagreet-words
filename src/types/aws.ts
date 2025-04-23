
/**
 * AWS specific types for CI/CD generation
 */

export interface S3Bucket {
  name: string;
  region: string;
}

export interface DomainName {
  name: string;
  zone: string;
}

export interface CloudFrontOriginAccessIdentity {
  id: string;
  name: string;
}
