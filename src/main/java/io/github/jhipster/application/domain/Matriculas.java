package io.github.jhipster.application.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Matriculas.
 */
@Entity
@Table(name = "matriculas")
public class Matriculas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "inicio")
    private ZonedDateTime inicio;

    @ManyToOne
    private Alumnos alumnos;

    @ManyToOne
    private Cursos cursos;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getInicio() {
        return inicio;
    }

    public Matriculas inicio(ZonedDateTime inicio) {
        this.inicio = inicio;
        return this;
    }

    public void setInicio(ZonedDateTime inicio) {
        this.inicio = inicio;
    }

    public Alumnos getAlumnos() {
        return alumnos;
    }

    public Matriculas alumnos(Alumnos alumnos) {
        this.alumnos = alumnos;
        return this;
    }

    public void setAlumnos(Alumnos alumnos) {
        this.alumnos = alumnos;
    }

    public Cursos getCursos() {
        return cursos;
    }

    public Matriculas cursos(Cursos cursos) {
        this.cursos = cursos;
        return this;
    }

    public void setCursos(Cursos cursos) {
        this.cursos = cursos;
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
        Matriculas matriculas = (Matriculas) o;
        if (matriculas.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), matriculas.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Matriculas{" +
            "id=" + getId() +
            ", inicio='" + getInicio() + "'" +
            "}";
    }
}
