package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ipartek.formacion.model.Persona;

public class PersonaDAO implements IDAO<Persona>{

	@Override
	public List<Persona> getAll() {

		ArrayList<Persona> registros = new ArrayList<Persona>();
		String sql = "SELECT id, nombre, avatar, sexo FROM persona ORDER BY id DESC LIMIT 500";

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(sql);
				//executeQuery() para las select, executeUpdate() para las modificaciones
				ResultSet rs = pst.executeQuery();

		) {

			while( rs.next() ) {
				
				Persona p = new Persona();
				p.setId( rs.getInt("id") );
				p.setNombre( rs.getString("nombre"));
				p.setAvatar( rs.getString("avatar"));
				p.setSexo( rs.getString("sexo"));
			
				registros.add(p);
				
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registros;
	}

	@Override
	public Persona getById(int id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Persona delete(int id) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Persona insert(Persona personaInsertar) throws Exception, SQLException {
		String sql = "INSERT INTO persona (nombre, avatar, sexo) values (?, ?, ?)";
		try (Connection con = ConnectionManager.getConnection()){
				PreparedStatement pst = con.prepareStatement(sql);
				//executeQuery() para las select, executeUpdate() para las modificaciones
				
				
				pst.setString(1, personaInsertar.getNombre());
				pst.setString(2, personaInsertar.getAvatar());
				pst.setString(3, personaInsertar.getSexo());
				
				int rs = pst.executeUpdate();
				//TODO rs erabili konprobaziñoren bat eitxeko

			
		} catch (SQLException e) {

			e.printStackTrace();
		}
		return personaInsertar;
	}

	@Override
	public Persona update(Persona pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

}
