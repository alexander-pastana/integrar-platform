package validation

import (
	"errors"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

type FieldError struct {
	Field   string `json:"field"`
	Tag     string `json:"tag"`
	Message string `json:"message"`
}

var validate = newValidator()

func newValidator() *validator.Validate {
	validate := validator.New()

	validate.RegisterTagNameFunc(func(field reflect.StructField) string {
		jsonTag := field.Tag.Get("json")
		fieldName := strings.SplitN(jsonTag, ",", 2)[0]

		if fieldName == "-" {
			return ""
		}

		if fieldName == "" {
			return field.Name
		}

		return fieldName
	})

	return validate
}

func Validate(data any) *FieldError {
	err := validate.Struct(data)
	if err == nil {
		return nil
	}

	var validationErrors validator.ValidationErrors
	if !errors.As(err, &validationErrors) {
		return &FieldError{
			Field:   "request",
			Tag:     "invalid",
			Message: "Invalid request data",
		}
	}

	first := validationErrors[0]

	return &FieldError{
		Field:   first.Field(),
		Tag:     first.Tag(),
		Message: mapErrorMessage(first.Field(), first.Tag()),
	}
}

func mapErrorMessage(field string, tag string) string {
	switch tag {
	case "required":
		return "The " + field + " field is required"
	default:
		return "The " + field + " field is invalid"
	}
}
