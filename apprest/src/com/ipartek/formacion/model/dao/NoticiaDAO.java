package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Noticia;

public class NoticiaDAO implements IDAO<Noticia> {
	
	private static final Logger LOGGER = Logger.getLogger(NoticiaDAO.class.getCanonicalName());
	
	private static NoticiaDAO INSTANCE = null;
	
	private static String SQL_GET_ALL   = "SELECT idNoticia , titularNoticia , fechaNoticia , textoNoticia FROM noticia ORDER BY idNoticia DESC"; 

	private NoticiaDAO() {
		super();		
	}
	
	public synchronized static NoticiaDAO getInstance() {
        if (INSTANCE == null) {
        	INSTANCE = new NoticiaDAO();
        }
        return INSTANCE;
	}
	
	
	@Override
	public List<Noticia> getAll() {
		LOGGER.info("getAll");
		 
		ArrayList<Noticia> registros = new ArrayList<Noticia>();
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
	public List<Noticia> getFiltered(String filtro) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Noticia getById(int id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Noticia delete(int id) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Noticia insert(Noticia pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Noticia update(Noticia pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}
	private Noticia mapper( ResultSet rs ) throws SQLException {
		Noticia n = new Noticia();
		n.setIdNoticia( rs.getInt("idNoticia") );
		n.setTitularNoticia( rs.getString("titularNoticia"));
		n.setFechaNoticia( rs.getString("fechaNoticia"));
		n.setTextoNoticia( rs.getString("textoNoticia"));
		return n;
	}

	@Override
	public List<Noticia> getAllProfesor() {
		// TODO Auto-generated method stub
		return null;
	}

}
