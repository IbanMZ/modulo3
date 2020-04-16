package com.ipartek.formacion.api.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Set;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.model.Persona;
import com.ipartek.formacion.model.dao.PersonaDAO;


@Path("/personas")
@Produces("application/json")
@Consumes("application/json")
public class PersonaController {

	private static final Logger LOGGER = Logger.getLogger(PersonaController.class.getCanonicalName());
	
	private static int id =1;
	
	//ToDo Singleton, deberiamos haber usado getInstancia
	private static PersonaDAO personaDAO = new PersonaDAO();

	private ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
	private Validator validator = factory.getValidator();
	
	@Context
	private ServletContext context;
	
	private static ArrayList<Persona> personas = new ArrayList<Persona>();
	
	public PersonaController() {
		super();
		
	}

	@GET
	public ArrayList<Persona> getAll() {	
		LOGGER.info("getAll");
		//return personas;		-- personaDAO.getAll() es una list que es una interfaz, se puede castear a array, linkedlist...
		ArrayList<Persona> registros = (ArrayList<Persona>) personaDAO.getAll();
		return registros;
	}
	
	@POST
	public Response insert(Persona persona) {
		LOGGER.info("insert(" + persona + ")");
		Persona registro = null;
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();
		try {
			registro = personaDAO.insert(persona);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//validar datos de la Persona javax.validation
		// validar pojo
		/*Set<ConstraintViolation<Persona>> violations = validator.validate(persona);
		persona.setId(id);
		if ( violations.isEmpty() ) {
			
			persona.setId(id);
			id++;
			personas.add(persona);
			response = Response.status(Status.CREATED).entity(persona).build();
			
		}else {
			ArrayList<String> errores = new ArrayList<String>();
			for ( ConstraintViolation<Persona> violation : violations ) { 
				errores.add( violation.getPropertyPath() + ": " + violation.getMessage() );
			}
			
			response = Response.status(Status.BAD_REQUEST).entity(errores).build();
		}*/
		response = Response.status(Status.CREATED).entity(registro).build();	
		return response;
	}
	
	@PUT
	@Path("/{id: \\d+}")
	public Response update(@PathParam("id") int id, Persona persona) {
		LOGGER.info("update(" + id + ", " + persona + ")");		
		Response response = Response.status(Status.NOT_FOUND).entity(persona).build();

		Set<ConstraintViolation<Persona>> violations = validator.validate(persona);
		if (!violations.isEmpty()) {
			ArrayList<String> errores = new ArrayList<String>();
			for (ConstraintViolation<Persona> violation : violations) {
				errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
			}
			response = Response.status(Status.BAD_REQUEST).entity(errores).build();
			
		}else {

			for (int i = 0; i < personas.size(); i++) {
	
				if (id == personas.get(i).getId()) {
					personas.remove(i);
					personas.add(i, persona);					
					response = Response.status(Status.OK).entity(persona).build();
					break;
				}
			}// for
			
		}	

		return response;
	}

	@DELETE
	@Path("/{id: \\d+}")
	public Response eliminar(@PathParam("id") int id) {
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();
		LOGGER.info("eliminar(" + id + ")");
		Persona persona = null;
			for(int i = 0; i < personas.size(); i++) {
			
				if( id == personas.get(i).getId()) {
					personas.remove(i);
					persona = personas.get(i);
					break;
				}
			}
		if(persona == null) {
			response = Response.status(Status.NOT_FOUND).build();
		}
		else {
			response = Response.status(Status.OK).entity(persona).build();
		}
		return response;
	}
}
