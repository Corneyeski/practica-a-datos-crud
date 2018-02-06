package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Alumnos;

import io.github.jhipster.application.repository.AlumnosRepository;
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
 * REST controller for managing Alumnos.
 */
@RestController
@RequestMapping("/api")
public class AlumnosResource {

    private final Logger log = LoggerFactory.getLogger(AlumnosResource.class);

    private static final String ENTITY_NAME = "alumnos";

    private final AlumnosRepository alumnosRepository;

    public AlumnosResource(AlumnosRepository alumnosRepository) {
        this.alumnosRepository = alumnosRepository;
    }

    /**
     * POST  /alumnos : Create a new alumnos.
     *
     * @param alumnos the alumnos to create
     * @return the ResponseEntity with status 201 (Created) and with body the new alumnos, or with status 400 (Bad Request) if the alumnos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/alumnos")
    @Timed
    public ResponseEntity<Alumnos> createAlumnos(@RequestBody Alumnos alumnos) throws URISyntaxException {
        log.debug("REST request to save Alumnos : {}", alumnos);
        if (alumnos.getId() != null) {
            throw new BadRequestAlertException("A new alumnos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Alumnos result = alumnosRepository.save(alumnos);
        return ResponseEntity.created(new URI("/api/alumnos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /alumnos : Updates an existing alumnos.
     *
     * @param alumnos the alumnos to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated alumnos,
     * or with status 400 (Bad Request) if the alumnos is not valid,
     * or with status 500 (Internal Server Error) if the alumnos couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/alumnos")
    @Timed
    public ResponseEntity<Alumnos> updateAlumnos(@RequestBody Alumnos alumnos) throws URISyntaxException {
        log.debug("REST request to update Alumnos : {}", alumnos);
        if (alumnos.getId() == null) {
            return createAlumnos(alumnos);
        }
        Alumnos result = alumnosRepository.save(alumnos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, alumnos.getId().toString()))
            .body(result);
    }

    /**
     * GET  /alumnos : get all the alumnos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of alumnos in body
     */
    @GetMapping("/alumnos")
    @Timed
    public List<Alumnos> getAllAlumnos() {
        log.debug("REST request to get all Alumnos");
        return alumnosRepository.findAll();
        }

    /**
     * GET  /alumnos/:id : get the "id" alumnos.
     *
     * @param id the id of the alumnos to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the alumnos, or with status 404 (Not Found)
     */
    @GetMapping("/alumnos/{id}")
    @Timed
    public ResponseEntity<Alumnos> getAlumnos(@PathVariable Long id) {
        log.debug("REST request to get Alumnos : {}", id);
        Alumnos alumnos = alumnosRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(alumnos));
    }

    /**
     * DELETE  /alumnos/:id : delete the "id" alumnos.
     *
     * @param id the id of the alumnos to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/alumnos/{id}")
    @Timed
    public ResponseEntity<Void> deleteAlumnos(@PathVariable Long id) {
        log.debug("REST request to delete Alumnos : {}", id);
        alumnosRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
