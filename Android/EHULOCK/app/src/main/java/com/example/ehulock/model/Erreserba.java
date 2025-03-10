package com.example.ehulock.model;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.Timestamp;
import java.util.ArrayList;

public class Erreserba {
    private int idErreserba;
    private int egoera;
    private Timestamp create_time;
    private Timestamp start_time;
    private Timestamp end_time;
    private Timestamp abisua;
    private Timestamp fill_time;
    private Timestamp empty_time;
    private int idUser;
    private int idKutxatila;

    public Erreserba() {
    }

    public Erreserba(int idErreserba, int egoera, Timestamp create_time, Timestamp start_time, Timestamp end_time, Timestamp abisua, Timestamp fill_time, Timestamp empty_time, int idUser, int idKutxatila) {
        this.idErreserba = idErreserba;
        this.egoera = egoera;
        this.create_time = create_time;
        this.start_time = start_time;
        this.end_time = end_time;
        this.abisua = abisua;
        this.fill_time = fill_time;
        this.empty_time = empty_time;
        this.idUser = idUser;
        this.idKutxatila = idKutxatila;
    }

    public Erreserba(JSONObject object){
        try{
            this.idErreserba = object.getInt("idErreserba");
            this.egoera = object.getInt("egoera");
            this.create_time = Timestamp.valueOf(object.getString("create_time"));
            this.start_time = Timestamp.valueOf(object.getString("start_time"));
            this.end_time = Timestamp.valueOf(object.getString("end_time"));
            this.abisua = Timestamp.valueOf(object.getString("abisua"));
            this.fill_time = Timestamp.valueOf(object.getString("fill_time"));
            this.empty_time = Timestamp.valueOf(object.getString("empty_time"));
            this.idUser = object.getInt("idUser");
            this.idKutxatila = object.getInt("idKutxatila");
        }catch (JSONException e){
            e.printStackTrace();
        }
    }

    public static ArrayList<Erreserba> fromJson(JSONArray jsonObjects){
        ArrayList<Erreserba> erreserbak = new ArrayList<Erreserba>();
        for(int i=0;i<jsonObjects.length();i++){
            try{
                erreserbak.add(new Erreserba(jsonObjects.getJSONObject(i)));
            }catch (JSONException e){
                e.printStackTrace();
            }
        }
        return erreserbak;
    }
    public int getIdErreserba() {
        return idErreserba;
    }

    public void setIdErreserba(int idErreserba) {
        this.idErreserba = idErreserba;
    }

    public int getEgoera() {
        return egoera;
    }

    public void setEgoera(int egoera) {
        egoera = egoera;
    }

    public Timestamp getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Timestamp create_time) {
        this.create_time = create_time;
    }

    public Timestamp getStart_time() {
        return start_time;
    }

    public void setStart_time(Timestamp start_time) {
        this.start_time = start_time;
    }

    public Timestamp getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Timestamp end_time) {
        this.end_time = end_time;
    }

    public Timestamp getAbisua() {
        return abisua;
    }

    public void setAbisua(Timestamp abisua) {
        this.abisua = abisua;
    }

    public Timestamp getFill_time() {
        return fill_time;
    }

    public void setFill_time(Timestamp fill_time) {
        this.fill_time = fill_time;
    }

    public Timestamp getEmpty_time() {
        return empty_time;
    }

    public void setEmpty_time(Timestamp empty_time) {
        this.empty_time = empty_time;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public int getIdKutxatila() {
        return idKutxatila;
    }

    public void setIdKutxatila(int idKutxatila) {
        this.idKutxatila = idKutxatila;
    }
}
