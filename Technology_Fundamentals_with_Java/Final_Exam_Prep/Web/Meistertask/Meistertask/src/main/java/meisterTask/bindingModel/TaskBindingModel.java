package meisterTask.bindingModel;

public class TaskBindingModel {
    private Integer id;
    private String title;
    private String status;

    public TaskBindingModel() {
    }

    public TaskBindingModel(String status, String title) {
        this.status = status;
        this.title = title;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
