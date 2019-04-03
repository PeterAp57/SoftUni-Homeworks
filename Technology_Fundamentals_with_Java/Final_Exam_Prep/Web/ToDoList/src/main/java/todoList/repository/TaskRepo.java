package todoList.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import todoList.entity.Task;

public interface TaskRepo extends JpaRepository<Task, Integer> {


}
