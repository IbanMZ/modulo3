package com.ipartek.formacion.api.controller;

import java.util.ArrayList;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.model.Persona;


@Path("/personas")
@Produces("application/json")
@Consumes("application/json")
public class PersonaController {

	private static final Logger LOGGER = Logger.getLogger(PersonaController.class.getCanonicalName());
	
	@Context
	private ServletContext context;
	
	private static ArrayList<Persona> personas = new ArrayList<Persona>();
	
	private static int id =1;
	
	
	static {
		personas.add( new Persona(1,"Arantxa","img/avatar1.png", "m") );
		personas.add( new Persona(2,"Idoia","img/avatar2.png", "m") );
		personas.add( new Persona(3,"Iker","img/avatar3.png", "h") );
		personas.add( new Persona(4,"Hodei","img/avatar4.png", "h") );
		id = 5;
	}

	
	public PersonaController() {
		super();
		
	}




	@GET
	public ArrayList<Persona> getAll() {	
		LOGGER.info("getAll");
		return personas;
	}
	
	@POST
	public Response insert(Persona persona) {
		LOGGER.info("insert(" + persona + ")");

		//TODO validar datos de la Persona javax.validation
		persona.setId(id);
		id++;
		personas.add(persona);
		
		//Devolvemos al navegador un 201 y los datos de la persona creada
		return Response.status(Status.CREATED).entity(persona).build();
	}
	
	@PUT
	@Path("/{id: \\d+}")
	public Persona update(@PathParam("id") int id, Persona persona) {
		LOGGER.info("update(" + id + ", " + persona + ")");
		for(int i = 0; i < personas.size(); i++) {
			
			if( id == personas.get(i).getId()) {
				personas.remove(i);
				personas.add(i, persona);
				break;
			}
	}
		return persona;
	}
	@DELETE
	@Path("/{id: \\d+}")
	public Response eliminar(@PathParam("id") int id) {
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
			return Response.status(Status.NOT_FOUND).build();
		}
		else {
		return Response.status(Status.OK).entity(persona).build();
		}
	}
}