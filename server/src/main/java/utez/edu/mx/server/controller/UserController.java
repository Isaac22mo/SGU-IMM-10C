package utez.edu.mx.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.server.modules.user.User;
import utez.edu.mx.server.service.UserService;
import utez.edu.mx.server.utils.ApiResponse;

@RestController
@RequestMapping("/api/users/")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse> findAll() {
        ApiResponse response = userService.findAll();
        return new ResponseEntity<>(response, response.getStatus());
    }

    @GetMapping("{id}")
    public ResponseEntity<ApiResponse> findById(@PathVariable Long id) {
        ApiResponse response = userService.findById(id);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody User user) {
        ApiResponse response = userService.create(user);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @PutMapping("{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @RequestBody User user) {
        ApiResponse response = userService.update(id, user);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        ApiResponse response = userService.delete(id);
        return new ResponseEntity<>(response, response.getStatus());
    }
}
