package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Curso;

public class CursoDAO implements IDAO<Curso>{
	
	private static final Logger LOGGER = Logger.getLogger(CursoDAO.class.getCanonicalName());
	
	private static CursoDAO INSTANCE = null;
	
	private static String SQL_GET_ALL   = "SELECT idCurso , nombreCurso , fotoCurso , precioCurso FROM curso ORDER BY idCurso  ASC LIMIT 500;";
	private static String SQL_GET_ALL_FILTERED   = "SELECT idCurso , nombreCurso , fotoCurso , precioCurso FROM curso where nombreCurso LIKE ? ORDER BY idCurso  ASC LIMIT 100;";
	
	private CursoDAO() {
		super();		
	}
	
	public synchronized static CursoDAO getInstance() {
        if (INSTANCE == null) {
        	INSTANCE = new CursoDAO();
        }
        return INSTANCE;
	}
	
	@Override
	public List<Curso> getAll() {
		LOGGER.info("getAll");
		 
		ArrayList<Curso> registros = new ArrayList<Curso>();
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL);
				
				
				ResultSet rs = pst.executeQuery();	
						
		) {

			LOGGER.info(pst.toString());
			
			while( rs.next() ) {
				//mandamos al mapper, y alli 
				registros.add( mapper(rs) );				
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registros;
	}

	@Override
	public List<Curso> getFiltered(String filtro) {
		LOGGER.info("getFiltered " + filtro);
		
		 
		ArrayList<Curso> registros = new ArrayList<Curso>();
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL_FILTERED );				
		) {
			pst.setString(1,"%" + filtro + "%");
			LOGGER.info("Sentencia----" + pst.toString());
			
			ResultSet rs = pst.executeQuery();
				
			while( rs.next() ) {
				//mandamos al mapper, y alli 
				registros.add( mapper(rs) );				
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registros;
		
	}

	@Override
	public Curso getById(int id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Curso delete(int id) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Curso insert(Curso pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Curso update(Curso pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}
	private Curso mapper( ResultSet rs ) throws SQLException {
		Curso c = new Curso();
		c.setIdCurso( rs.getInt("idCurso") );
		c.setNombreCurso( rs.getString("nombreCurso"));
		c.setFotoCurso( rs.getString("fotoCurso"));
		c.setPrecio( rs.getFloat("precioCurso"));
		return c;
	}


	

	 

}
