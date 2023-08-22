package de.neuefische.backend.Security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@With
@Document("Users")
public class MongoUser {
    private String id;
    private String username;
    private String password;
}
