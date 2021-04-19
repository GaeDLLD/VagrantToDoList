import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TodoList, TodoListRelations, Todo} from '../models';
import {TodoRepository} from './todo.repository';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id,
  TodoListRelations
> {

  public readonly todoList: HasManyRepositoryFactory<Todo, typeof TodoList.prototype.id>;

  constructor(
    @inject('datasources.Db') dataSource: DbDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(TodoList, dataSource);
    this.todoList = this.createHasManyRepositoryFactoryFor('todoList', todoRepositoryGetter,);
    this.registerInclusionResolver('todoList', this.todoList.inclusionResolver);
  }

  public findByTitle(title: string) {
    return this.findOne({where: {title}});
  }
}
