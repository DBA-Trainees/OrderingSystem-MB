using OrderSystem.Debugging;

namespace OrderSystem
{
    public class OrderSystemConsts
    {
        public const string LocalizationSourceName = "OrderSystem";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "f7ea29aa8180406d96fd63275e2974a9";
    }
}
