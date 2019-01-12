output "vpc_id" {
  value = "${module.vpc.vpc_id}"
}

output "db_hostname" {
	value = "${module.rds.db_instance_address}"
}

output "db_password" {
	value = "${module.rds.db_instance_password}"
  sensitive = true
}

output "db_database_name" {
	value = "${module.rds.db_instance_database}"
}

output "db_username" {
	value = "${module.rds.db_instance_user}"
}

output "security_internal_id" {
  value = "${module.security.internal_id}"
}

output "subnet_internal_ids" {
  value = "${module.vpc.subnet_private_ids}"
}

output "github_token" {
  value = "${var.github_token}"
  sensitive = true
}

output "slack_webhook_url" {
  value = "${var.slack_webhook_url}"
  sensitive = true
}