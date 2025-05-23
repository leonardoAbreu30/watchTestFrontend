terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    # You'll need to configure this with your own S3 bucket for state storage
    key = "785d743e-366f-48c5-af12-adffb9c94546"
  }
}

provider "aws" {
  region = var.aws_region
}

# Use data source to reference existing S3 bucket
data "aws_s3_bucket" "website" {
  bucket = var.existing_bucket_name
}

# Configure the existing bucket for website hosting
resource "aws_s3_bucket_website_configuration" "website" {
  bucket = data.aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# Update bucket policy for the existing bucket
resource "aws_s3_bucket_policy" "website" {
  bucket = data.aws_s3_bucket.website.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${data.aws_s3_bucket.website.arn}/*"
      },
    ]
  })
}

# Configure public access for the existing bucket
resource "aws_s3_bucket_public_access_block" "website" {
  bucket = data.aws_s3_bucket.website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}