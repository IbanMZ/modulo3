package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.Persona;

public class PersonaDAO implements IDAO<Persona>{

	private static final Logger LOGGER = Logger.getLogger(PersonaDAO.class.getCanonicalName());
	
	private static PersonaDAO INSTANCE = null;
	
	private static String SQL_GET_ALL   = "select 	p.id ,\n" + 
			" p.nombre,\n" + 
			" p.avatar ,\n" + 
			" p.sexo ,\n" + 
			" pc.id_persona ,\n" + 
			" pc.id_curso ,\n" + 
			" c.idCurso ,\n" + 
			" c.nombreCurso ,\n" + 
			" c.precioCurso ,\n" + 
			" c.fotoCurso \n" + 
			" from (persona p left join persona_has_curso pc on p.id = pc.id_persona)\n" + 
			" left join curso c on pc.id_curso = c.idCurso where idrol = 1 LIMIT 500; ";
	private static String SQL_GET_ALL_PROFESOR   = "select 	p.id ,\n" + 
			" p.nombre,\n" + 
			" p.avatar ,\n" + 
			" p.sexo ,\n" + 
			" pc.id_persona ,\n" + 
			" pc.id_curso ,\n" + 
			" c.idCurso ,\n" + 
			" c.nombreCurso ,\n" + 
			" c.precioCurso ,\n" + 
			" c.fotoCurso \n" + 
			" from (persona p left join persona_has_curso pc on p.id = pc.id_persona)\n" + 
			" left join curso c on pc.id_curso = c.idCurso where idrol = 2 LIMIT 500; ";
	private static String SQL_GET_BY_ID = "SELECT 	p.id ,\\n\" + \n" + 
			"			\" p.nombre,\\n\" + \n" + 
			"			\" p.avatar ,\\n\" + \n" + 
			"			\" p.sexo ,\\n\" + \n" + 
			"			\" pc.id_persona ,\\n\" + \n" + 
			"			\" pc.id_curso ,\\n\" + \n" + 
			"			\" c.idCurso ,\\n\" + \n" + 
			"			\" c.nombreCurso ,\\n\" + \n" + 
			"			\" c.precioCurso ,\\n\" + \n" + 
			"			\" c.fotoCurso \\n\" + \n" + 
			"			\" from (persona p left join persona_has_curso pc on p.id = pc.id_persona)\\n\" + \n" + 
			"			\" left join curso c on pc.id_curso = c.idCurso where p.id = ?; ";
	private static String SQL_DELETE    = "DELETE FROM persona WHERE id = ?; ";
	private static String SQL_INSERT    = "INSERT INTO persona ( nombre, avatar, sexo, idrol) VALUES ( ?, ?, ?, ? ); ";
	private static String SQL_UPDATE    = "UPDATE persona SET nombre = ?, avatar = ?,  sexo = ? WHERE id = ?; ";
	private static String SQL_ASIGNAR_CURSO    = "INSERT INTO persona_has_curso (id_persona, id_curso) VALUES ( ?, ?); ";
	private static String SQL_ELIMINAR_CURSO    = "DELETE FROM persona_has_curso WHERE id_persona = ? AND id_curso = ?;  ";
	

	private PersonaDAO() {
		super();		
	}
	
	public synchronized static PersonaDAO getInstance() {
        if (INSTANCE == null) {
        	INSTANCE = new PersonaDAO();
        }
        return INSTANCE;
	}
    
	
	@Override
	public List<Persona> getAllProfesor() {

		LOGGER.info("getAllProfesor");
		
		ArrayList<Persona> registros = new ArrayList<Persona>();
		HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL_PROFESOR);
				ResultSet rs = pst.executeQuery();

		) {

			LOGGER.info(pst.toString());
			
			while( rs.next() ) {
				//mandamos al mapper, y alli 
				 mapper(rs, hmPersonas );				
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}
		
		return new ArrayList<Persona> ( hmPersonas.values() );
	}
	@Override
	public List<Persona> getAll() {

		LOGGER.info("getAll");
		
		ArrayList<Persona> registros = new ArrayList<Persona>();
		HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL);
				ResultSet rs = pst.executeQuery();

		) {

			LOGGER.info(pst.toString());
			
			while( rs.next() ) {
				//mandamos al mapper, y alli 
				 mapper(rs, hmPersonas );				
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}
		
		return new ArrayList<Persona> ( hmPersonas.values() );
	}


	@Override
	public Persona getById(int id) throws Exception {
		//NO FUNCIONA. El campo registro esta en null porque todabia no hemos recuperado nada del hashmap
		//creo que no usamos este metodo
		
		Persona registro = null;
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_BY_ID);
		) {

			pst.setInt(1, id);
			LOGGER.info(pst.toString());
			
			try( ResultSet rs = pst.executeQuery() ){
				
				HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();
				if( rs.next() ) {					
					 registro= mapper(rs, hmPersonas );					
					
				}else {
					throw new Exception("Registro no encontrado para id = " + id);
				}
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registro;
	}
	

	@Override
	public Persona delete(int id) throws Exception, SQLException {
		Persona registro = null;
		
		//recuperar persona antes de eliminar
		registro = getById(id);
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_DELETE);
		) {

			pst.setInt(1, id);
			LOGGER.info(pst.toString());
			
			//eliminamos la persona
			int affetedRows = pst.executeUpdate();	
			if (affetedRows != 1) {
				throw new Exception("No se puede eliminar registro " + id);
			}
			
		} catch (SQLException e) {

			throw new SQLException("No se puede eliminar registro " + e.getMessage() );
		}

		return registro;
	}
	

	@Override
	public Persona insert(Persona personaInsertar) throws Exception, SQLException {
		
		try (Connection con = ConnectionManager.getConnection()){
				PreparedStatement pst = con.prepareStatement(SQL_INSERT);
				//executeQuery() para las select, executeUpdate() para las modificaciones
				
				
				pst.setString(1, personaInsertar.getNombre());
				pst.setString(2, personaInsertar.getAvatar());
				pst.setString(3, personaInsertar.getSexo());
				pst.setInt(4, personaInsertar.getIdRol() );
				
				
				int rs = pst.executeUpdate();
				//TODO rs erabili konprobaziñoren bat eitxeko

			
		} catch (SQLException e) {

			throw new Exception("No se puede modificar registro " + e.getMessage() );
		}
		return personaInsertar;
	}

	@Override
	public Persona update(Persona pojo) throws Exception, SQLException {

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_UPDATE);
		) {

			pst.setString(1, pojo.getNombre() );
			pst.setString(2, pojo.getAvatar() );
			pst.setString(3, pojo.getSexo() );
			pst.setInt(4, pojo.getId() );
			LOGGER.info(pst.toString());
			
			//eliminamos la persona
			int affetedRows = pst.executeUpdate();	
			if (affetedRows != 1) {				
				throw new Exception("No se puede modificar registro " + pojo);
			}
			
		} catch (SQLException e) {

			throw new Exception("No se puede modificar registro " + e.getMessage() );
		}

		return pojo;
	}
	
	public boolean asignarCurso( int idPersona, int idCurso ) throws Exception, SQLException {
		boolean resul = false;
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_ASIGNAR_CURSO);
		) {

			pst.setInt(1, idPersona);
			pst.setInt(2, idCurso);
			LOGGER.info(pst.toString());
			
			
			int affetedRows = pst.executeUpdate();	
			if (affetedRows == 1) {
				resul = true;
			}else {
				resul = false;		
			}
		}catch (SQLException e) {

			throw new SQLException("Curso ya asignado " + e.getMessage() );
		}
		
		return resul;
	}
	
	public boolean eliminarCurso( int idPersona, int idCurso ) throws Exception, SQLException {
		boolean resul = false;
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_ELIMINAR_CURSO);
		) {

			pst.setInt(1, idPersona);
			pst.setInt(2, idCurso);
			LOGGER.info(pst.toString());
			
			//eliminamos la persona
			int affetedRows = pst.executeUpdate();	
			if (affetedRows == 1) {
				resul = true;
			}else {
				throw new Exception("No se encontrado registro id_persona =" + idPersona + " id_curso=" + idCurso );		
			}
		}
		
		return resul;
	}
	
	
	private Persona mapper( ResultSet rs, HashMap<Integer, Persona> hm ) throws SQLException {
		
		int key = rs.getInt("id"); 
		
		Persona p = hm.get(key);
		
		// si no existe en el hm se crea
		if ( p == null ) {
			
			p = new Persona();
			p.setId( key  );
			p.setNombre( rs.getString("nombre"));
			p.setAvatar( rs.getString("avatar"));
			p.setSexo( rs.getString("sexo"));
						
		}
		// se aniade el curso
				int idCurso = rs.getInt("idCurso");
				if ( idCurso != 0) {
					Curso c = new Curso();
					c.setIdCurso(idCurso);
					c.setNombreCurso(rs.getString("nombreCurso"));
					c.setPrecio( rs.getFloat("precioCurso"));
					c.setFotoCurso(rs.getString("fotoCurso"));			
					p.getCursos().add(c);
				}	
				
				//actualizar hashmap
				hm.put(key, p);
				
				return p;
		
	}

	@Override
	public List<Persona> getFiltered(String filtro) {
		// Metodo para Curso
		return null;
	}

	

}
