export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
/*
export interface createTodoPayLoad {
  title: string;
  completed: boolean;
}
*/

export type CreateTodoPayload = Omit<Todo, "id">;

/**
 * To see pick  in typescript and Partial 
 */


/*
export interface UpdateTodoPayLoad
{
title?:string;
completed?:boolean;

}

*/

export type UpdateTodoPayLoad=Partial<CreateTodoPayload>;