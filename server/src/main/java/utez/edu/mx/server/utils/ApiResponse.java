package utez.edu.mx.server.utils;

import org.springframework.http.HttpStatus;

public class ApiResponse {
    private Object data;
    private boolean error;
    private String mensaje;
    private HttpStatus status;

    public ApiResponse(Object data, boolean error, String mensaje, HttpStatus status) {
        this.data = data;
        this.error = error;
        this.mensaje = mensaje;
        this.status = status;
    }

    public ApiResponse(boolean error, String mensaje, HttpStatus status) {
        this.error = error;
        this.mensaje = mensaje;
        this.status = status;
    }

    public Object getData() { return data; }
    public boolean isError() { return error; }
    public String getMensaje() { return mensaje; }
    public HttpStatus getStatus() { return status; }
}
