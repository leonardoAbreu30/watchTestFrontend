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

# API Gateway
resource "aws_apigatewayv2_api" "todo_api" {
  name          = "todo-api-${var.environment}"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = [coalesce(var.cors_origin, "*")]
    allow_methods = ["GET", "POST", "DELETE", "OPTIONS"]
    allow_headers = ["Content-Type", "Authorization", "X-Amz-Date", "X-Api-Key", "X-Amz-Security-Token"]
    max_age      = 300
  }
}

resource "aws_apigatewayv2_stage" "todo_api" {
  api_id = aws_apigatewayv2_api.todo_api.id
  name   = var.environment
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "todo_api" {
  api_id           = aws_apigatewayv2_api.todo_api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.todo_app.invoke_arn
}

resource "aws_apigatewayv2_route" "todo_api" {
  api_id    = aws_apigatewayv2_api.todo_api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.todo_api.id}"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.todo_app.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.todo_api.execution_arn}/*/*"
}

# Add these outputs at the end of the file
output "api_endpoint" {
  description = "API Gateway endpoint URL"
  value       = "${aws_apigatewayv2_api.todo_api.api_endpoint}/${aws_apigatewayv2_stage.todo_api.name}"
}
