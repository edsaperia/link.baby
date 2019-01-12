
resource "aws_db_parameter_group" "default57" {
  name   = "rds-mysql-utf8mb4-57"
  family = "mysql5.7"

  parameter {
    name  = "character_set_server"
    value = "utf8mb4"
  }

  parameter {
    name  = "character_set_client"
    value = "utf8mb4"
  }

  parameter {
    name  = "innodb_file_format"
    value = "Barracuda"
  }

  parameter {
    name  = "innodb_large_prefix"
    value = "1"
  }

  parameter {
    name = "max_connections"
    value = "100000"
  }

  parameter {
    name = "max_user_connections"
    value = "100000"
  }
}

resource "aws_db_parameter_group" "default" {
  name   = "rds-mysql-utf8mb4-56"
  family = "mysql5.6"

  parameter {
    name  = "character_set_server"
    value = "utf8mb4"
  }

  parameter {
    name  = "character_set_client"
    value = "utf8mb4"
  }

  parameter {
    name  = "innodb_file_format"
    value = "Barracuda"
  }

  parameter {
    name  = "innodb_large_prefix"
    value = "1"
  }

  parameter {
    name = "max_connections"
    value = "100000"
  }

  parameter {
    name = "max_user_connections"
    value = "100000"
  }
}

resource "aws_db_instance" "default" {
  depends_on              = ["aws_security_group.default"]
  identifier              = "${var.identifier}"
  allocated_storage       = "${var.storage}"
  engine                  = "${var.engine}"
  engine_version          = "${var.engine_version}"
  instance_class          = "${var.instance_class}"
  name                    = "${var.db_name}"
  username                = "${var.username}"
  password                = "${var.password}"
  vpc_security_group_ids  = ["${aws_security_group.default.id}"]
  db_subnet_group_name    = "${aws_db_subnet_group.default.id}"
  parameter_group_name    = "${aws_db_parameter_group.default57.id}"
  backup_retention_period = "31"
  maintenance_window      = "Mon:00:00-Mon:03:00"
  apply_immediately       = true
  allow_major_version_upgrade = true
}

resource "aws_db_subnet_group" "default" {
  name        = "main_subnet_group"
  description = "Our main group of subnets"
  subnet_ids  = ["${aws_subnet.subnet_1.id}", "${aws_subnet.subnet_2.id}"]
}
