import { Module } from "@nestjs/common";
import { TodoModuleBase } from "./base/todo.module.base";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";

@Module({
  imports: [TodoModuleBase],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
