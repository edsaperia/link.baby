variable "region" {
  description = "AWS region to deploy to (e.g. us-east-2)"
}

variable "az_count" {
  description = "The number of availailbilty zones to deploy across (must be minimum of two to use ALB)"
}

# Use "aws ec2 describe-availability-zones --region us-east-2"
# to figure out the name of the AZs on every region as required
variable "availability_zones" {
  description = "Availability zones by region"
  default = {
    "us-east-2" = "us-east-2a,us-east-2b,us-east-2c"
    "eu-west-2" = "eu-west-2a,eu-west-2b,eu-west-2c"
    "eu-west-1" = "eu-west-1a,eu-west-1b,eu-west-1c"
  }
}
