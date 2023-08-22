package de.neuefische.backend.Security;

import de.neuefische.backend.IdService.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MongoUserService implements UserDetailsService {

    private final MongoUserRepository mongoUserRepository;
    private final IdService idService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepository.findMongoUserByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("User with username: " + username + " not found"));
        return new User(mongoUser.getUsername(), mongoUser.getPassword(), List.of());
    }

    public MongoUser saveUser(MongoUser user){
        if (mongoUserRepository.findMongoUserByUsername(user.getUsername()).equals(user.getUsername())){
            throw new IllegalArgumentException("Username already taken");
        }
        PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
        mongoUserRepository.save(user.withPassword(encoder.encode(user.getPassword())).withId(idService.generateId()));     // user -> setPassword(encoder(user.getPassword))
        return user;
    }

}
