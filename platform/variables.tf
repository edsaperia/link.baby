variable "region" {
  description = "AWS region to deploy to (e.g. ap-southeast-2)"
}

variable "az_count" {
  description = "The number of availailbilty zones to deploy across (must be minimum of two to use ALB)"
  default = 1
}

variable "ssh_allowed_ip" {
  description = "IP address allowed to SSH to bastion instance"
}

variable "acm_arn" {
  description = "ARN of ACM SSL certificate"
}

variable "bastion_instance_type" {
  description = "Instance type of bastion instance (e.g. t2.micro)"
}

variable "bastion_key_pair_name" {
  description = "Name of the Key Pair that can be used to access bastion instance"
}

variable "bastion_ami" {
  description = "AMI of bastion instance"
  # These are ids for Amazon's Linux AMI from: https://aws.amazon.com/amazon-linux-ami
  default = {
    us-east-1 = "ami-b73b63a0"
    ap-southeast-2 = "ami-db704cb8"
    us-east-2 = "ami-c5062ba0"
    eu-west-2 = "ami-403e2524"
    eu-west-1 = "ami-d834aba1"
  }
}

variable "db_instance_type" {
  description = "type of database (e.g. db.t2.small)"
}
variable "db_instance_name" {
  description = "instance name of db"
}
variable "db_storage" {
  description = "amount of storage for db (in GB)"
}
variable "db_engine" {
  description = "engine of db (e.g. mysql)"
}
variable "db_engine_version" {
  description = "engine version of db"
}
variable "db_database_name" {
  description = "name of database on db instance"
}
variable "db_username" {
  description = "username to access database"
}
variable "db_password" {
  description = "password to access database"
}


variable "environment" {
  description = "e.g. production"
}

variable "github_repo" {
  description = "this github repo"
}
variable "github_user" {
  description = "github user the repo is under"
}
variable "github_branch" {
  description = "github repo branch to pull from"
}

variable "github_token" {
  description = "github personal access token from https://github.com/settings/tokens/new - needs admin:repo_hook, repo scopes"
}
variable "slack_webhook_url" {
  description = "slack webhook url"
}

variable "secrets" {
  type = "map"
  default = {}
}
