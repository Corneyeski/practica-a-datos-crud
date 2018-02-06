package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.PracticaADatosCrudApp;

import io.github.jhipster.application.domain.Cursos;
import io.github.jhipster.application.repository.CursosRepository;
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
 * Test class for the CursosResource REST controller.
 *
 * @see CursosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PracticaADatosCrudApp.class)
public class CursosResourceIntTest {

    private static final String DEFAULT_NOMBRE_CURSO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_CURSO = "BBBBBBBBBB";

    @Autowired
    private CursosRepository cursosRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCursosMockMvc;

    private Cursos cursos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CursosResource cursosResource = new CursosResource(cursosRepository);
        this.restCursosMockMvc = MockMvcBuilders.standaloneSetup(cursosResource)
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
    public static Cursos createEntity(EntityManager em) {
        Cursos cursos = new Cursos()
            .nombreCurso(DEFAULT_NOMBRE_CURSO);
        return cursos;
    }

    @Before
    public void initTest() {
        cursos = createEntity(em);
    }

    @Test
    @Transactional
    public void createCursos() throws Exception {
        int databaseSizeBeforeCreate = cursosRepository.findAll().size();

        // Create the Cursos
        restCursosMockMvc.perform(post("/api/cursos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cursos)))
            .andExpect(status().isCreated());

        // Validate the Cursos in the database
        List<Cursos> cursosList = cursosRepository.findAll();
        assertThat(cursosList).hasSize(databaseSizeBeforeCreate + 1);
        Cursos testCursos = cursosList.get(cursosList.size() - 1);
        assertThat(testCursos.getNombreCurso()).isEqualTo(DEFAULT_NOMBRE_CURSO);
    }

    @Test
    @Transactional
    public void createCursosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cursosRepository.findAll().size();

        // Create the Cursos with an existing ID
        cursos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCursosMockMvc.perform(post("/api/cursos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cursos)))
            .andExpect(status().isBadRequest());

        // Validate the Cursos in the database
        List<Cursos> cursosList = cursosRepository.findAll();
        assertThat(cursosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCursos() throws Exception {
        // Initialize the database
        cursosRepository.saveAndFlush(cursos);

        // Get all the cursosList
        restCursosMockMvc.perform(get("/api/cursos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cursos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreCurso").value(hasItem(DEFAULT_NOMBRE_CURSO.toString())));
    }

    @Test
    @Transactional
    public void getCursos() throws Exception {
        // Initialize the database
        cursosRepository.saveAndFlush(cursos);

        // Get the cursos
        restCursosMockMvc.perform(get("/api/cursos/{id}", cursos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cursos.getId().intValue()))
            .andExpect(jsonPath("$.nombreCurso").value(DEFAULT_NOMBRE_CURSO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCursos() throws Exception {
        // Get the cursos
        restCursosMockMvc.perform(get("/api/cursos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCursos() throws Exception {
        // Initialize the database
        cursosRepository.saveAndFlush(cursos);
        int databaseSizeBeforeUpdate = cursosRepository.findAll().size();

        // Update the cursos
        Cursos updatedCursos = cursosRepository.findOne(cursos.getId());
        // Disconnect from session so that the updates on updatedCursos are not directly saved in db
        em.detach(updatedCursos);
        updatedCursos
            .nombreCurso(UPDATED_NOMBRE_CURSO);

        restCursosMockMvc.perform(put("/api/cursos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCursos)))
            .andExpect(status().isOk());

        // Validate the Cursos in the database
        List<Cursos> cursosList = cursosRepository.findAll();
        assertThat(cursosList).hasSize(databaseSizeBeforeUpdate);
        Cursos testCursos = cursosList.get(cursosList.size() - 1);
        assertThat(testCursos.getNombreCurso()).isEqualTo(UPDATED_NOMBRE_CURSO);
    }

    @Test
    @Transactional
    public void updateNonExistingCursos() throws Exception {
        int databaseSizeBeforeUpdate = cursosRepository.findAll().size();

        // Create the Cursos

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCursosMockMvc.perform(put("/api/cursos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cursos)))
            .andExpect(status().isCreated());

        // Validate the Cursos in the database
        List<Cursos> cursosList = cursosRepository.findAll();
        assertThat(cursosList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCursos() throws Exception {
        // Initialize the database
        cursosRepository.saveAndFlush(cursos);
        int databaseSizeBeforeDelete = cursosRepository.findAll().size();

        // Get the cursos
        restCursosMockMvc.perform(delete("/api/cursos/{id}", cursos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cursos> cursosList = cursosRepository.findAll();
        assertThat(cursosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cursos.class);
        Cursos cursos1 = new Cursos();
        cursos1.setId(1L);
        Cursos cursos2 = new Cursos();
        cursos2.setId(cursos1.getId());
        assertThat(cursos1).isEqualTo(cursos2);
        cursos2.setId(2L);
        assertThat(cursos1).isNotEqualTo(cursos2);
        cursos1.setId(null);
        assertThat(cursos1).isNotEqualTo(cursos2);
    }
}
