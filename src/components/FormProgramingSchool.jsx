import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const validTypes = ["image/jpeg", "image/jpg", "image/png"];

const programingExpSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.string(),
});
const formSchema = z.object({
  name: z.string().min(1, { message: "Pole obowiązkowe" }).min(3, { message: "Zbyt krótkie (min.3 znaki)" }),
  surname: z.string().min(1, { message: "Pole obowiązkowe" }).min(3, { message: "Zbyt krótkie (min.3 znaki)" }),
  email: z.string().min(1, { message: "Pole obowiązkowe" }).email("Podaj poprawnie email"),
  phone: z
    .string()
    .min(1, { message: "Pole obowiązkowe" })
    .length(9, { message: "Numer tel. musi składać się z 9 cyfr" }),
  cv: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "CV jest obowiązkowe",
    })
    .refine(
      (files) => {
        return validTypes.includes(files[0]?.type);
      },
      {
        message: "Akceptowalne formaty JPG/PNG",
      }
    ),
  courseType: z.string(),
  technologies: z.array(z.string()).min(1, { message: "Wybierz przynajmniej jedną technologię" }),
  programingExp: z.array(programingExpSchema),
});

const initialExp = { name: "JavaScript", level: "1", id: "" };

function FormProgramingSchool({ handleData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const { fields, append, remove } = useFieldArray({ name: "programingExp", control });
  const getData = (data) => {
    if ((isChecked && fields.length !== 0) || !isChecked) {
      if (!isChecked) {
        data.programingExp.length = 0;
      }
      handleData(data);
    } else {
      return false;
    }
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckBox = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <form onSubmit={handleSubmit(getData)}>
        <div className="dataInputArea">
          <p>Dane Osobowe</p>
          <input {...register("name")} className="personalDataInput" type="text" name="name" placeholder="Imię" />
          {errors.name && <p className="errorInfo">{errors.name.message}</p>}
          <input
            {...register("surname")}
            className="personalDataInput"
            type="text"
            name="surname"
            placeholder="Nazwisko"
          />
          {errors.surname && <p className="errorInfo">{errors.surname.message}</p>}
          <input {...register("email")} className="personalDataInput" type="email" name="email" placeholder="E-mail" />
          {errors.email && <p className="errorInfo">{errors.email.message}</p>}
          <input
            {...register("phone")}
            className="personalDataInput"
            type="number"
            name="phone"
            placeholder="Numer telefonu"
          />
          {errors.phone && <p className="errorInfo">{errors.phone.message}</p>}
        </div>

        <div className="dataInputArea">
          <p>Preferencje kursu</p>
          <div>
            <span>Wybierz formę nauki:</span>
            <label>
              <input
                {...register("courseType")}
                type="radio"
                className="courseType"
                name="courseType"
                value="Stacjonarnie"
                defaultChecked
              />
              Stacjonarnie
            </label>
            <label>
              <input {...register("courseType")} type="radio" className="courseType" name="courseType" value="Online" />
              Online
            </label>
          </div>
          <select {...register("technologies")} multiple={true} name="technologies">
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="Next.js">Next.js</option>
          </select>
          {errors.technologies && <p className="errorInfo">{errors.technologies.message}</p>}
        </div>
        <div className="dataInputArea">
          <p>Dodaj swoje CV</p>
          <input {...register("cv")} type="file" name="cv" />
          {errors.cv && <p className="errorInfo">{errors.cv.message}</p>}
        </div>
        <div className="dataInputArea">
          <p>Doświadczenie w programowaniu</p>
          <div>
            <input type="checkbox" id="programingExpCheck" name="programingExpCheck" onChange={handleCheckBox} />
            <label htmlFor="programingExpCheck">Czy masz doświadczenie w programowaniu?</label>
          </div>

          {isChecked && (
            <div>
              <button type="button" onClick={() => append(initialExp)}>
                Dodaj doświadczenie
              </button>
              {fields.length === 0 && <p className="errorInfo">Dodaj przynamniej jedno jeśli zaznaczone</p>}
              {errors.programingExp && <p className="errorInfo">{errors.programingExp.message}</p>}
              {fields.map(({ id }, index) => {
                setValue(`programingExp.${index}.id`, id);
                return (
                  <div className="experience" key={id}>
                    <select {...register(`programingExp.${index}.name`)}>
                      <option value="JavaScript">JavaScript</option>
                      <option value="JAVA">JAVA</option>
                      <option value="Rust">Rust</option>
                      <option value="Python">Python</option>
                      <option value="C">C</option>
                      <option value="C#">C#</option>
                    </select>
                    <select {...register(`programingExp.${index}.level`)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button onClick={() => remove(index)}>Usuń</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <input type="submit" id="submitButton" value="Wyślij zgłoszenie" />
      </form>
    </>
  );
}

export default FormProgramingSchool;
