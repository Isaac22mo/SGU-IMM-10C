package utez.edu.mx.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import utez.edu.mx.server.modules.user.User;
import utez.edu.mx.server.modules.user.UserRepository;
import utez.edu.mx.server.utils.ApiResponse;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public ApiResponse findAll() {
        List<User> lista = userRepository.findAll();
        return new ApiResponse(lista, false, "Usuarios obtenidos correctamente", HttpStatus.OK);
    }

    public ApiResponse findById(Long id) {
        try {
            Optional<User> found = userRepository.findById(id);
            if (found.isPresent()) {
                return new ApiResponse(found.get(), false, "Usuario encontrado", HttpStatus.OK);
            }
            return new ApiResponse(true, "Usuario no encontrado", HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ApiResponse(true, "Error al buscar el usuario", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ApiResponse create(User user) {
        try {
            userRepository.save(user);
            return new ApiResponse(false, "Usuario guardado con éxito", HttpStatus.CREATED);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ApiResponse(true, "Error al guardar usuario", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ApiResponse update(Long id, User updatedUser) {
        try {
            Optional<User> found = userRepository.findById(id);
            if (found.isEmpty()) {
                return new ApiResponse(true, "Usuario no encontrado", HttpStatus.NOT_FOUND);
            }
            User user = found.get();
            user.setNombre(updatedUser.getNombre());
            user.setApellido(updatedUser.getApellido());
            user.setCorreo(updatedUser.getCorreo());
            user.setTelefono(updatedUser.getTelefono());
            userRepository.save(user);
            return new ApiResponse(false, "Usuario actualizado con éxito", HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ApiResponse(true, "Error al actualizar usuario", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ApiResponse delete(Long id) {
        try {
            if (!userRepository.existsById(id)) {
                return new ApiResponse(true, "Usuario no encontrado", HttpStatus.NOT_FOUND);
            }
            userRepository.deleteById(id);
            return new ApiResponse(false, "Usuario eliminado correctamente", HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ApiResponse(true, "Error al eliminar usuario", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
