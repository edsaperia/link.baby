variable "identifier" {
  default     = "database"
  description = "Identifier for your DB"
}

variable "storage" {
  default     = "20"
  description = "Storage size in GB"
}

variable "engine" {
  default     = "mysql"
  description = "Engine type, example values mysql"
}

variable "engine_version" {
  description = "Engine version"

  default = "5.6.22"
}

variable "instance_class" {
  default     = "db.t2.micro"
  description = "Instance class"
}

variable "db_name" {
  default     = "db"
  description = "db name"
}

variable "username" {
  default     = "user"
  description = "User name"
}

variable "password" {
  description = "password, provide through your ENV variables"
}

variable "vpc_cidr_block" {
  description = "CIDR block of the VPC"
}