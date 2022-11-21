package br.edu.alfaumuarama.aula05_25_08_2022;

import android.app.ListActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.HashMap;

import br.edu.alfaumuarama.aula05_25_08_2022.datasources.BuscarDadosWeb;

public class MainActivity extends ListActivity {

    private ArrayList<HashMap<String,String>> listaDados;
    private String id = "1";
    private Button pag1;
    private Button pag2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        pag1 = findViewById(R.id.btn1);
        pag2 = findViewById(R.id.btn2);

        Intent dadosRecebidos = getIntent();

        if (dadosRecebidos != null) {
            //capturando os dados recebidos no caminho de tela
            Bundle params = dadosRecebidos.getExtras();
            if (params != null) {
                id = params.getString("id");
            }
        }

        pag1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    listaDados = new BuscarDadosWeb().execute(Config.urlApi + id).get();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                Intent telaDetalhes = new Intent(MainActivity.this, MainActivity.class);

                //criando os parametros e adicionando os dados do item selecionado
                Bundle params = new Bundle();
                params.putString("id", "1");
                //adicionando os parametros no caminho de tela
                telaDetalhes.putExtras(params);
                //abrindo a tela detalhes
                startActivity(telaDetalhes);
            }
        });

        pag2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    listaDados = new BuscarDadosWeb().execute(Config.urlApi + id).get();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                Intent telaDetalhes = new Intent(MainActivity.this, MainActivity.class);

                //criando os parametros e adicionando os dados do item selecionado
                Bundle params = new Bundle();
                params.putString("id", "2");
                //adicionando os parametros no caminho de tela
                telaDetalhes.putExtras(params);
                //abrindo a tela detalhes
                startActivity(telaDetalhes);
            }
        });

        try {
            listaDados = new BuscarDadosWeb().execute(Config.urlApi + id).get();
        } catch (Exception e) {
            e.printStackTrace();
        }

        String texto = listaDados.get(0).get("name");
        Toast.makeText(this, texto, Toast.LENGTH_LONG).show();

        //criando o adapter que ir configrar como os dados sao carregados
        ListAdapter adapter = new SimpleAdapter(
            this,                      //contexto que o onjeto esta
            listaDados,                //local onde estao os dados
            R.layout.listview_modelo,  //item que servira de modelo para cada celula
            new String[] { "name" },   //quais campos dos dados serao carregados
            new int[] { R.id.txtNome } //objetos de tela onde dados vao ser carregados
        );

        //adicionando o adaptador criado na listView da tela
        setListAdapter(adapter);
    }

    @Override
    protected void onListItemClick(ListView l, View v, int position, long id) {
        super.onListItemClick(l, v, position, id);
        //carregando os dados do item selecionado na lista pelo index
        HashMap<String, String> pokebola =  listaDados.get(position);

        //criando o caminho para abrir a tela de detalhes
        Intent telaDetalhes = new Intent(MainActivity.this, DetalhesActivity.class);

        //criando os parametros e adicionando os dados do item selecionado
        Bundle params = new Bundle();
        params.putString("name", pokebola.get("name"));
        params.putString("imagem", pokebola.get("imagem"));
        //adicionando os parametros no caminho de tela
        telaDetalhes.putExtras(params);

        //abrindo a tela detalhes
        startActivity(telaDetalhes);
    }
}