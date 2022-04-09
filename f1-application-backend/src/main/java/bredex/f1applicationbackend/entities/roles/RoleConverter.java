package bredex.f1applicationbackend.entities.roles;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class RoleConverter  implements AttributeConverter<Role, Integer> {

    @Override
    public Integer convertToDatabaseColumn(Role category) {
        if (category == null) {
            return null;
        }
        return category.getId();
    }

    @Override
    public Role convertToEntityAttribute(Integer id) {
        if (id == null) {
            return null;
        }

        return Stream.of(Role.values())
                .filter(c -> c.getId().equals(id))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}