using System.Windows;
using System.Windows.Controls;
using GranularDemo.Shared;
using GranularDemo.Shared.Interfaces;

namespace GranularDemo
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private int _count = 1;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var domProxy = Resolver.Resolve<IDomProxy>();

            domProxy.Alert("Hello, World! " + "#" + _count);

            ++_count;
            var btn = (Button)sender;
            var btnText = (string) btn.Content;
            domProxy.UpdateBtnText(btn.Name, btnText + " #" + _count);
        }
    }
}
