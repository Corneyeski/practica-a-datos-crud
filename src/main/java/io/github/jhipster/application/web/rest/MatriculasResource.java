package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Matriculas;

import io.github.jhipster.application.repository.MatriculasRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Matriculas.
 */
@RestController
@RequestMapping("/api")
public class MatriculasResource {

    private final Logger log = LoggerFactory.getLogger(MatriculasResource.class);

    private static final String ENTITY_NAME = "matriculas";

    private final MatriculasRepository matriculasRepository;

    public MatriculasResource(MatriculasRepository matriculasRepository) {
        this.matriculasRepository = matriculasRepository;
    }

    /**
     * POST  /matriculas : Create a new matriculas.
     *
     * @param matriculas the matriculas to create
     * @return the ResponseEntity with status 201 (Created) and with body the new matriculas, or with status 400 (Bad Request) if the matriculas has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/matriculas")
    @Timed
    public ResponseEntity<Matriculas> createMatriculas(@RequestBody Matriculas matriculas) throws URISyntaxException {
        log.debug("REST request to save Matriculas : {}", matriculas);
        if (matriculas.getId() != null) {
            throw new BadRequestAlertException("A new matriculas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Matriculas result = matriculasRepository.save(matriculas);
        return ResponseEntity.created(new URI("/api/matriculas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /matriculas : Updates an existing matriculas.
     *
     * @param matriculas the matriculas to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated matriculas,
     * or with status 400 (Bad Request) if the matriculas is not valid,
     * or with status 500 (Internal Server Error) if the matriculas couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/matriculas")
    @Timed
    public ResponseEntity<Matriculas> updateMatriculas(@RequestBody Matriculas matriculas) throws URISyntaxException {
        log.debug("REST request to update Matriculas : {}", matriculas);
        if (matriculas.getId() == null) {
            return createMatriculas(matriculas);
        }
        Matriculas result = matriculasRepository.save(matriculas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, matriculas.getId().toString()))
            .body(result);
    }

    /**
     * GET  /matriculas : get all the matriculas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of matriculas in body
     */
    @GetMapping("/matriculas")
    @Timed
    public List<Matriculas> getAllMatriculas() {
        log.debug("REST request to get all Matriculas");
        return matriculasRepository.findAll();
        }

    /**
     * GET  /matriculas/:id : get the "id" matriculas.
     *
     * @param id the id of the matriculas to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the matriculas, or with status 404 (Not Found)
     */
    @GetMapping("/matriculas/{id}")
    @Timed
    public ResponseEntity<Matriculas> getMatriculas(@PathVariable Long id) {
        log.debug("REST request to get Matriculas : {}", id);
        Matriculas matriculas = matriculasRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(matriculas));
    }

    /**
     * DELETE  /matriculas/:id : delete the "id" matriculas.
     *
     * @param id the id of the matriculas to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/matriculas/{id}")
    @Timed
    public ResponseEntity<Void> deleteMatriculas(@PathVariable Long id) {
        log.debug("REST request to delete Matriculas : {}", id);
        matriculasRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
