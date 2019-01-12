# Configure the AWS Provider
provider "aws" {
  region = "${var.region}"
}

provider "github" {
  token        = "${var.github_token}"
  organization = "${var.github_user}"
}

module "vpc" {
  source = "./modules/vpc"

  region = "${var.region}"
  az_count = "${var.az_count}"
}

module "security" {
  source = "./modules/security"

  vpc_id = "${module.vpc.vpc_id}"
  vpc_cidr_block = "${module.vpc.vpc_cidr_block}"
  ssh_allowed_ip = "${var.ssh_allowed_ip}"
}

module "bastion" {
  source = "./modules/bastion"

  instance_type = "${var.bastion_instance_type}"
  key_pair_name = "${var.bastion_key_pair_name}"
  security_group_internal_id = "${module.security.internal_id}"
  security_group_ssh_id = "${module.security.ssh_id}"
  ami = "${lookup(var.bastion_ami, var.region)}"
  bastion_subnet_ids = "${module.vpc.subnet_public_ids}"
}

module "rds" {
  source = "./modules/rds"

  instance_class = "${var.db_instance_type}"
  identifier = "${var.db_instance_name}"
  storage = "${var.db_storage}"
  engine = "${var.db_engine}"
  engine_version = "${var.db_engine_version}"
  db_name = "${var.db_database_name}"
  username = "${var.db_username}"
  password = "${var.db_password}"

  vpc_id = "${module.vpc.vpc_id}"
  vpc_cidr_block = "${module.vpc.vpc_cidr_block}"
}
