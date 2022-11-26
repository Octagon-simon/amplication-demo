import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { TodoServiceBase } from "./base/todo.service.base";

@Injectable()
export class TodoService extends TodoServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
