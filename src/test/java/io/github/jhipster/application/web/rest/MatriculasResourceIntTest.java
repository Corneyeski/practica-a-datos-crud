package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.PracticaADatosCrudApp;

import io.github.jhipster.application.domain.Matriculas;
import io.github.jhipster.application.repository.MatriculasRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.sameInstant;
import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MatriculasResource REST controller.
 *
 * @see MatriculasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PracticaADatosCrudApp.class)
public class MatriculasResourceIntTest {

    private static final ZonedDateTime DEFAULT_INICIO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_INICIO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private MatriculasRepository matriculasRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMatriculasMockMvc;

    private Matriculas matriculas;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MatriculasResource matriculasResource = new MatriculasResource(matriculasRepository);
        this.restMatriculasMockMvc = MockMvcBuilders.standaloneSetup(matriculasResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Matriculas createEntity(EntityManager em) {
        Matriculas matriculas = new Matriculas()
            .inicio(DEFAULT_INICIO);
        return matriculas;
    }

    @Before
    public void initTest() {
        matriculas = createEntity(em);
    }

    @Test
    @Transactional
    public void createMatriculas() throws Exception {
        int databaseSizeBeforeCreate = matriculasRepository.findAll().size();

        // Create the Matriculas
        restMatriculasMockMvc.perform(post("/api/matriculas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matriculas)))
            .andExpect(status().isCreated());

        // Validate the Matriculas in the database
        List<Matriculas> matriculasList = matriculasRepository.findAll();
        assertThat(matriculasList).hasSize(databaseSizeBeforeCreate + 1);
        Matriculas testMatriculas = matriculasList.get(matriculasList.size() - 1);
        assertThat(testMatriculas.getInicio()).isEqualTo(DEFAULT_INICIO);
    }

    @Test
    @Transactional
    public void createMatriculasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = matriculasRepository.findAll().size();

        // Create the Matriculas with an existing ID
        matriculas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMatriculasMockMvc.perform(post("/api/matriculas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matriculas)))
            .andExpect(status().isBadRequest());

        // Validate the Matriculas in the database
        List<Matriculas> matriculasList = matriculasRepository.findAll();
        assertThat(matriculasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMatriculas() throws Exception {
        // Initialize the database
        matriculasRepository.saveAndFlush(matriculas);

        // Get all the matriculasList
        restMatriculasMockMvc.perform(get("/api/matriculas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(matriculas.getId().intValue())))
            .andExpect(jsonPath("$.[*].inicio").value(hasItem(sameInstant(DEFAULT_INICIO))));
    }

    @Test
    @Transactional
    public void getMatriculas() throws Exception {
        // Initialize the database
        matriculasRepository.saveAndFlush(matriculas);

        // Get the matriculas
        restMatriculasMockMvc.perform(get("/api/matriculas/{id}", matriculas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(matriculas.getId().intValue()))
            .andExpect(jsonPath("$.inicio").value(sameInstant(DEFAULT_INICIO)));
    }

    @Test
    @Transactional
    public void getNonExistingMatriculas() throws Exception {
        // Get the matriculas
        restMatriculasMockMvc.perform(get("/api/matriculas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMatriculas() throws Exception {
        // Initialize the database
        matriculasRepository.saveAndFlush(matriculas);
        int databaseSizeBeforeUpdate = matriculasRepository.findAll().size();

        // Update the matriculas
        Matriculas updatedMatriculas = matriculasRepository.findOne(matriculas.getId());
        // Disconnect from session so that the updates on updatedMatriculas are not directly saved in db
        em.detach(updatedMatriculas);
        updatedMatriculas
            .inicio(UPDATED_INICIO);

        restMatriculasMockMvc.perform(put("/api/matriculas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMatriculas)))
            .andExpect(status().isOk());

        // Validate the Matriculas in the database
        List<Matriculas> matriculasList = matriculasRepository.findAll();
        assertThat(matriculasList).hasSize(databaseSizeBeforeUpdate);
        Matriculas testMatriculas = matriculasList.get(matriculasList.size() - 1);
        assertThat(testMatriculas.getInicio()).isEqualTo(UPDATED_INICIO);
    }

    @Test
    @Transactional
    public void updateNonExistingMatriculas() throws Exception {
        int databaseSizeBeforeUpdate = matriculasRepository.findAll().size();

        // Create the Matriculas

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMatriculasMockMvc.perform(put("/api/matriculas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matriculas)))
            .andExpect(status().isCreated());

        // Validate the Matriculas in the database
        List<Matriculas> matriculasList = matriculasRepository.findAll();
        assertThat(matriculasList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMatriculas() throws Exception {
        // Initialize the database
        matriculasRepository.saveAndFlush(matriculas);
        int databaseSizeBeforeDelete = matriculasRepository.findAll().size();

        // Get the matriculas
        restMatriculasMockMvc.perform(delete("/api/matriculas/{id}", matriculas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Matriculas> matriculasList = matriculasRepository.findAll();
        assertThat(matriculasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Matriculas.class);
        Matriculas matriculas1 = new Matriculas();
        matriculas1.setId(1L);
        Matriculas matriculas2 = new Matriculas();
        matriculas2.setId(matriculas1.getId());
        assertThat(matriculas1).isEqualTo(matriculas2);
        matriculas2.setId(2L);
        assertThat(matriculas1).isNotEqualTo(matriculas2);
        matriculas1.setId(null);
        assertThat(matriculas1).isNotEqualTo(matriculas2);
    }
}
