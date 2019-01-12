terraform {
  backend "s3" {
    bucket = "packs-deployment-prod"
    key    = "terraform-ecs-autoscale-alb/platform.tfstate"
    region = "eu-west-1"
    encrypt= "true"
  }
}
