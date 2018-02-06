package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Alumnos.
 */
@Entity
@Table(name = "alumnos")
public class Alumnos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_alumno")
    private String nombreAlumno;

    @OneToMany(mappedBy = "alumnos")
    @JsonIgnore
    private Set<Matriculas> matriculas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreAlumno() {
        return nombreAlumno;
    }

    public Alumnos nombreAlumno(String nombreAlumno) {
        this.nombreAlumno = nombreAlumno;
        return this;
    }

    public void setNombreAlumno(String nombreAlumno) {
        this.nombreAlumno = nombreAlumno;
    }

    public Set<Matriculas> getMatriculas() {
        return matriculas;
    }

    public Alumnos matriculas(Set<Matriculas> matriculas) {
        this.matriculas = matriculas;
        return this;
    }

    public Alumnos addMatriculas(Matriculas matriculas) {
        this.matriculas.add(matriculas);
        matriculas.setAlumnos(this);
        return this;
    }

    public Alumnos removeMatriculas(Matriculas matriculas) {
        this.matriculas.remove(matriculas);
        matriculas.setAlumnos(null);
        return this;
    }

    public void setMatriculas(Set<Matriculas> matriculas) {
        this.matriculas = matriculas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Alumnos alumnos = (Alumnos) o;
        if (alumnos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), alumnos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Alumnos{" +
            "id=" + getId() +
            ", nombreAlumno='" + getNombreAlumno() + "'" +
            "}";
    }
}
