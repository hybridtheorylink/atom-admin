package com.atom.plugins.mongo.constraints;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.atom.plugins.mongo.validation.TypeValidator;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({METHOD, FIELD, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = TypeValidator.class)
@Documented
public @interface Type {

    String message() default "{com.cybermkd.constraints.Type.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String value();

}

