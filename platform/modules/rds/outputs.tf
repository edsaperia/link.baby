output "subnet_group" {
  value = "${aws_db_subnet_group.default.name}"
}

output "db_instance_id" {
  value = "${aws_db_instance.default.id}"
}

output "db_instance_address" {
  value = "${aws_db_instance.default.address}"
}

output "db_instance_user" {
  value = "${aws_db_instance.default.username}"
}

output "db_instance_password" {
  value = "${aws_db_instance.default.password}"
}

output "db_instance_database" {
  value = "${aws_db_instance.default.name}"
}