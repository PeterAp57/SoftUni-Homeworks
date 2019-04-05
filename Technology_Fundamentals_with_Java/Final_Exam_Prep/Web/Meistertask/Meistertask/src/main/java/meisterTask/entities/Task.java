package meisterTask.entities;

import javax.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    private Integer id;
    private String status;
    private String title;

    public Task() {
    }

    public Task(String status, String title) {
        this.status = status;
        this.title = title;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(nullable = false)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Column(columnDefinition = "text" )
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
