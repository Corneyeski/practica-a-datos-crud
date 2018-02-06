package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.PracticaADatosCrudApp;

import io.github.jhipster.application.domain.Alumnos;
import io.github.jhipster.application.repository.AlumnosRepository;
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
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AlumnosResource REST controller.
 *
 * @see AlumnosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PracticaADatosCrudApp.class)
public class AlumnosResourceIntTest {

    private static final String DEFAULT_NOMBRE_ALUMNO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ALUMNO = "BBBBBBBBBB";

    @Autowired
    private AlumnosRepository alumnosRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAlumnosMockMvc;

    private Alumnos alumnos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlumnosResource alumnosResource = new AlumnosResource(alumnosRepository);
        this.restAlumnosMockMvc = MockMvcBuilders.standaloneSetup(alumnosResource)
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
    public static Alumnos createEntity(EntityManager em) {
        Alumnos alumnos = new Alumnos()
            .nombreAlumno(DEFAULT_NOMBRE_ALUMNO);
        return alumnos;
    }

    @Before
    public void initTest() {
        alumnos = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlumnos() throws Exception {
        int databaseSizeBeforeCreate = alumnosRepository.findAll().size();

        // Create the Alumnos
        restAlumnosMockMvc.perform(post("/api/alumnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alumnos)))
            .andExpect(status().isCreated());

        // Validate the Alumnos in the database
        List<Alumnos> alumnosList = alumnosRepository.findAll();
        assertThat(alumnosList).hasSize(databaseSizeBeforeCreate + 1);
        Alumnos testAlumnos = alumnosList.get(alumnosList.size() - 1);
        assertThat(testAlumnos.getNombreAlumno()).isEqualTo(DEFAULT_NOMBRE_ALUMNO);
    }

    @Test
    @Transactional
    public void createAlumnosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alumnosRepository.findAll().size();

        // Create the Alumnos with an existing ID
        alumnos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlumnosMockMvc.perform(post("/api/alumnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alumnos)))
            .andExpect(status().isBadRequest());

        // Validate the Alumnos in the database
        List<Alumnos> alumnosList = alumnosRepository.findAll();
        assertThat(alumnosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAlumnos() throws Exception {
        // Initialize the database
        alumnosRepository.saveAndFlush(alumnos);

        // Get all the alumnosList
        restAlumnosMockMvc.perform(get("/api/alumnos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alumnos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreAlumno").value(hasItem(DEFAULT_NOMBRE_ALUMNO.toString())));
    }

    @Test
    @Transactional
    public void getAlumnos() throws Exception {
        // Initialize the database
        alumnosRepository.saveAndFlush(alumnos);

        // Get the alumnos
        restAlumnosMockMvc.perform(get("/api/alumnos/{id}", alumnos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alumnos.getId().intValue()))
            .andExpect(jsonPath("$.nombreAlumno").value(DEFAULT_NOMBRE_ALUMNO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAlumnos() throws Exception {
        // Get the alumnos
        restAlumnosMockMvc.perform(get("/api/alumnos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlumnos() throws Exception {
        // Initialize the database
        alumnosRepository.saveAndFlush(alumnos);
        int databaseSizeBeforeUpdate = alumnosRepository.findAll().size();

        // Update the alumnos
        Alumnos updatedAlumnos = alumnosRepository.findOne(alumnos.getId());
        // Disconnect from session so that the updates on updatedAlumnos are not directly saved in db
        em.detach(updatedAlumnos);
        updatedAlumnos
            .nombreAlumno(UPDATED_NOMBRE_ALUMNO);

        restAlumnosMockMvc.perform(put("/api/alumnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAlumnos)))
            .andExpect(status().isOk());

        // Validate the Alumnos in the database
        List<Alumnos> alumnosList = alumnosRepository.findAll();
        assertThat(alumnosList).hasSize(databaseSizeBeforeUpdate);
        Alumnos testAlumnos = alumnosList.get(alumnosList.size() - 1);
        assertThat(testAlumnos.getNombreAlumno()).isEqualTo(UPDATED_NOMBRE_ALUMNO);
    }

    @Test
    @Transactional
    public void updateNonExistingAlumnos() throws Exception {
        int databaseSizeBeforeUpdate = alumnosRepository.findAll().size();

        // Create the Alumnos

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAlumnosMockMvc.perform(put("/api/alumnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alumnos)))
            .andExpect(status().isCreated());

        // Validate the Alumnos in the database
        List<Alumnos> alumnosList = alumnosRepository.findAll();
        assertThat(alumnosList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAlumnos() throws Exception {
        // Initialize the database
        alumnosRepository.saveAndFlush(alumnos);
        int databaseSizeBeforeDelete = alumnosRepository.findAll().size();

        // Get the alumnos
        restAlumnosMockMvc.perform(delete("/api/alumnos/{id}", alumnos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Alumnos> alumnosList = alumnosRepository.findAll();
        assertThat(alumnosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Alumnos.class);
        Alumnos alumnos1 = new Alumnos();
        alumnos1.setId(1L);
        Alumnos alumnos2 = new Alumnos();
        alumnos2.setId(alumnos1.getId());
        assertThat(alumnos1).isEqualTo(alumnos2);
        alumnos2.setId(2L);
        assertThat(alumnos1).isNotEqualTo(alumnos2);
        alumnos1.setId(null);
        assertThat(alumnos1).isNotEqualTo(alumnos2);
    }
}
