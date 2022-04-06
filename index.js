import java.applet.*;
import java.awt.*;
import java.awt.event.*;
// Пример из http://kek.ksu.ru/EOS/Java/gl3_4.html
public class functions extends Applet implements ItemListener, ActionListener
{  private int n=20; // пикселов в единице 			   		
   private String name=""; // название функции
        private String str1="new"; 
   private Choice tip=new Choice(); 
   private TextField size;
   Panel p1=new Panel(); // панель для элементов управления
   functions.myCanvas p2=new functions.myCanvas(); // панель для рисования
  
   @Override
   public void init()
   {  setLayout(new BorderLayout());
      p1.setLayout(new GridLayout(2,2));
      add("North",p1);	
      add("Center",p2);
      p1.add(new Label("Выбирайте функцию: "));		
      tip.addItem("Синус");
      tip.addItem("Косинус");		
      tip.addItem("Тангенс");				
      tip.addItemListener(this);
      p1.add(tip);		
      p1.add(new Label("Пикселов в единичном отрезке:"));
      size=new TextField(""+n,5); 
      p1.add(size); 
      size.addActionListener(this);
  }
  
    @Override
  public void itemStateChanged(ItemEvent e)
  {  if (e.getItemSelectable()==tip)
     {  name=(String)e.getItem();
        p2.repaint();	
     }
  }
  
  public void actionPerformed(ActionEvent e)
  {   if (e.getSource()==size)
      {   str1=size.getText();
          n=Integer.parseInt(size.getText()); 
          p2.repaint();
      }
  }
// Внутренний класс. Панель для рисования
 class myCanvas extends Canvas
    {  int M, // ширина панели
       N, // высота панели
       x, y, xold, yold;
       public void paint (Graphics g)
       {   M=getSize().width;
           N=getSize().height;
           setBackground(new Color(200,200,200));
           g.drawLine(M/2,0,M/2,N);	
           g.drawLine(0,N/2,M,N/2);		
           for (x=0; x<M; x++)
           {   if (name.equals("Синус"))
               {   y=(int)(N/2-Math.sin((double)(x-M/2)/n)*n);
               }
               else if (name.equals("Косинус"))
               {   y=(int)(N/2-Math.cos((double)(x-M/2)/n)*n);
               }
               else if (name.equals("Тангенс"))
               {   y=(int)(N/2-Math.tan((double)(x-M/2)/n)*n);
               }
               else return;
               if (x==0) { xold=x; yold=y; }
               g.drawLine(xold, yold, x, y); 
               xold=x; yold=y;			
           }
      }
    }//Конец внутреннего класса
}
