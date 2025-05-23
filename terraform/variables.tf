variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (e.g., dev, prod)"
  type        = string
  default     = "dev"
}

variable "existing_bucket_name" {
  description = "terraform-bucket-watch-test-frontend"
  type        = string
} 

variable "cors_origin" {
  description = "CORS allowed origin (must be a valid URL, '*', or URL pattern). Examples: https://example.com, *, https://*.example.com"
  type        = string
  default     = "*"

  validation {
    condition     = can(regex("^(\\*|https?://[\\w\\-\\.]+(:\\d+)?(/.*)?|https?://\\*\\.([\\w\\-\\.]+)(:\\d+)?(/.*)?)?$", var.cors_origin))
    error_message = "The cors_origin must be a valid URL starting with http:// or https://, a single '*', or a valid pattern like https://*.example.com"
  }
} 