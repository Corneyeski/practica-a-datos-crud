package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Cursos.
 */
@Entity
@Table(name = "cursos")
public class Cursos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_curso")
    private String nombreCurso;

    @OneToMany(mappedBy = "cursos")
    @JsonIgnore
    private Set<Matriculas> matriculas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreCurso() {
        return nombreCurso;
    }

    public Cursos nombreCurso(String nombreCurso) {
        this.nombreCurso = nombreCurso;
        return this;
    }

    public void setNombreCurso(String nombreCurso) {
        this.nombreCurso = nombreCurso;
    }

    public Set<Matriculas> getMatriculas() {
        return matriculas;
    }

    public Cursos matriculas(Set<Matriculas> matriculas) {
        this.matriculas = matriculas;
        return this;
    }

    public Cursos addMatriculas(Matriculas matriculas) {
        this.matriculas.add(matriculas);
        matriculas.setCursos(this);
        return this;
    }

    public Cursos removeMatriculas(Matriculas matriculas) {
        this.matriculas.remove(matriculas);
        matriculas.setCursos(null);
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
        Cursos cursos = (Cursos) o;
        if (cursos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cursos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cursos{" +
            "id=" + getId() +
            ", nombreCurso='" + getNombreCurso() + "'" +
            "}";
    }
}
