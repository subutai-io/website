<?php

/* partials/header.html.twig */
class __TwigTemplate_791a14829a2c97c8bf965f6cfa8b06ad32af890eef136c599d98841e937667f9 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<header>
    <div class=\"container\">
        <div class=\"logoWrap\">
            <a href=\"";
        // line 4
        echo ($context["base_url"] ?? null);
        echo "\"><img src=\"";
        echo ($context["base_url"] ?? null);
        echo "/images/logo-subutai-web-mono-white.png\"></a>
        </div>
        <div class=\"menuWrap\">
            <nav id=\"socialNav\">
                <ul>
                    <li>
                        <a href=\"https://www.youtube.com/channel/UCISHGzbHjYWYFfu7krnYLkA\" target=\"_blank\"><i class=\"fab fa-youtube\"></i></a>
                    </li>
                    <li>
                        <a href=\"https://www.linkedin.com/company/subutai-social-cloud/\" target=\"_blank\"><i class=\"fab fa-linkedin-in\"></i></a>
                    </li>
                    <li>
                        <a href=\"https://www.reddit.com/r/SubutaiKHAN/\" target=\"_blank\"><i class=\"fab fa-reddit-alien\"></i></a>
                    </li>
                    <li>
                        <a href=\"https://twitter.com/Subutai_KHAN\" target=\"_blank\"><i class=\"fab fa-twitter\"></i></a>
                    </li>
                    <li>
                        <a href=\"https://t.me/SubutaiKHAN\" target=\"_blank\"><i class=\"fab fa-telegram-plane\"></i></a>
                    </li>
                    <li>
                        <a href=\"https://slack.subutai.io/\" target=\"_blank\"><i class=\"fab fa-slack-hash\"></i></a>
                    </li>
                    <li>
                        <a href=\"https://www.facebook.com/SubutaiKHAN/\" target=\"_blank\"><i class=\"fab fa-facebook-f\"></i></a>
                    </li>
                </ul>
            </nav>
            <nav id=\"mainMenu\">
                <label for=\"drop\" class=\"toggle iconBar\"><i class=\"fas fa-bars\"></i></label>
                <input type=\"checkbox\" id=\"drop\" />
                <ul class=\"menu\">
                    <li>
                        <!-- First Tier Drop Down -->
                        <label for=\"drop-1\" class=\"toggle\">Products +</label>
                        <a href=\"#\">Products</a>
                        <input type=\"checkbox\" id=\"drop-1\"/>
                        <ul>
                            <li><a href=\"";
        // line 42
        echo ($context["base_url"] ?? null);
        echo "/products/subutai-router\">Router</a></li>
                            <li><a href=\"";
        // line 43
        echo ($context["base_url"] ?? null);
        echo "/products/subutai-peeros\">PeerOS</a></li>
                            <li><a href=\"";
        // line 44
        echo ($context["base_url"] ?? null);
        echo "/products/subutai-bazaar\">Bazaar</a></li>
                            <li><a href=\"";
        // line 45
        echo ($context["base_url"] ?? null);
        echo "/products/subutai-blueprints\">Blueprints</a></li>
                            <li><a href=\"";
        // line 46
        echo ($context["base_url"] ?? null);
        echo "/products/khan\">KHAN</a></li>
                        </ul> 
                    </li>
                    <li>
                        <!-- First Tier Drop Down -->
                        <label for=\"drop-2\" class=\"toggle\">About +</label>
                        <a href=\"#\">About</a>
                        <input type=\"checkbox\" id=\"drop-2\"/>
                        <ul>
                            <li><a href=\"";
        // line 55
        echo ($context["base_url"] ?? null);
        echo "/about/leadership\">Leadership</a></li>
                            <li><a href=\"";
        // line 56
        echo ($context["base_url"] ?? null);
        echo "/about/team\">Team</a></li>
                        </ul>
                    </li>
                <li><a href=\"";
        // line 59
        echo ($context["base_url"] ?? null);
        echo "/getting-started\">Getting Started</a></li>
                <li><a href=\"https://docs.subutai.io/\" target=\"_blank\">Documentation</a></li>
                <li>
                    <!-- First Tier Drop Down -->
                    <label for=\"drop-3\" class=\"toggle\">Ideation +</label>
                    <a href=\"#\">Ideation</a>
                    <input type=\"checkbox\" id=\"drop-3\"/>
                    <ul>
                        <li><a href=\"#\">Blog</a></li>
                        <li><a href=\"#\">Hardware Security</a></li>
                        <li><a href=\"";
        // line 69
        echo ($context["base_url"] ?? null);
        echo "/ideation/p2p-cloud\">P2P Cloud</a></li>
                    </ul>
                </li>
                <li><a href=\"";
        // line 72
        echo ($context["base_url"] ?? null);
        echo "/contact\">Contact</a></li>
            </ul>
        </nav>

            ";
        // line 107
        echo "        </div>
    </div>
</header>";
    }

    public function getTemplateName()
    {
        return "partials/header.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  131 => 107,  124 => 72,  118 => 69,  105 => 59,  99 => 56,  95 => 55,  83 => 46,  79 => 45,  75 => 44,  71 => 43,  67 => 42,  24 => 4,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<header>
    <div class=\"container\">
        <div class=\"logoWrap\">
            <a href=\"{{ base_url }}\"><img src=\"{{ base_url }}/images/logo-subutai-web-mono-white.png\"></a>
        </div>
        <div class=\"menuWrap\">
            <nav id=\"socialNav\">
                <ul>
                    <li>
                        <a href=\"https://www.youtube.com/channel/UCISHGzbHjYWYFfu7krnYLkA\" target=\"_blank\"><i class=\"fab fa-youtube\"></i></a>
                    </li>
                    <li>
                        <a href=\"https://www.linkedin.com/company/subutai-social-cloud/\" target=\"_blank\"><i class=\"fab fa-linkedin-in\"></i></a>
                    </li>
                    <li>
                        <a href=\"https://www.reddit.com/r/SubutaiKHAN/\" target=\"_blank\"><i class=\"fab fa-reddit-alien\"></i></a>
                    </li>
                    <li>
                        <a href=\"https://twitter.com/Subutai_KHAN\" target=\"_blank\"><i class=\"fab fa-twitter\"></i></a>
                    </li>
                    <li>
                        <a href=\"https://t.me/SubutaiKHAN\" target=\"_blank\"><i class=\"fab fa-telegram-plane\"></i></a>
                    </li>
                    <li>
                        <a href=\"https://slack.subutai.io/\" target=\"_blank\"><i class=\"fab fa-slack-hash\"></i></a>
                    </li>
                    <li>
                        <a href=\"https://www.facebook.com/SubutaiKHAN/\" target=\"_blank\"><i class=\"fab fa-facebook-f\"></i></a>
                    </li>
                </ul>
            </nav>
            <nav id=\"mainMenu\">
                <label for=\"drop\" class=\"toggle iconBar\"><i class=\"fas fa-bars\"></i></label>
                <input type=\"checkbox\" id=\"drop\" />
                <ul class=\"menu\">
                    <li>
                        <!-- First Tier Drop Down -->
                        <label for=\"drop-1\" class=\"toggle\">Products +</label>
                        <a href=\"#\">Products</a>
                        <input type=\"checkbox\" id=\"drop-1\"/>
                        <ul>
                            <li><a href=\"{{ base_url }}/products/subutai-router\">Router</a></li>
                            <li><a href=\"{{ base_url }}/products/subutai-peeros\">PeerOS</a></li>
                            <li><a href=\"{{ base_url }}/products/subutai-bazaar\">Bazaar</a></li>
                            <li><a href=\"{{ base_url }}/products/subutai-blueprints\">Blueprints</a></li>
                            <li><a href=\"{{ base_url }}/products/khan\">KHAN</a></li>
                        </ul> 
                    </li>
                    <li>
                        <!-- First Tier Drop Down -->
                        <label for=\"drop-2\" class=\"toggle\">About +</label>
                        <a href=\"#\">About</a>
                        <input type=\"checkbox\" id=\"drop-2\"/>
                        <ul>
                            <li><a href=\"{{ base_url }}/about/leadership\">Leadership</a></li>
                            <li><a href=\"{{ base_url }}/about/team\">Team</a></li>
                        </ul>
                    </li>
                <li><a href=\"{{ base_url }}/getting-started\">Getting Started</a></li>
                <li><a href=\"https://docs.subutai.io/\" target=\"_blank\">Documentation</a></li>
                <li>
                    <!-- First Tier Drop Down -->
                    <label for=\"drop-3\" class=\"toggle\">Ideation +</label>
                    <a href=\"#\">Ideation</a>
                    <input type=\"checkbox\" id=\"drop-3\"/>
                    <ul>
                        <li><a href=\"#\">Blog</a></li>
                        <li><a href=\"#\">Hardware Security</a></li>
                        <li><a href=\"{{ base_url }}/ideation/p2p-cloud\">P2P Cloud</a></li>
                    </ul>
                </li>
                <li><a href=\"{{ base_url }}/contact\">Contact</a></li>
            </ul>
        </nav>

            {# <nav id=\"mainMenu\" class=\"topNav\">
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">Products <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                        <a href=\"{{ base_url }}/products/subutai-router\">Router</a>
                        <a href=\"{{ base_url }}/products/subutai-peeros\">PeerOS</a>
                        <a href=\"{{ base_url }}/products/subutai-bazaar\">Bazaar</a>
                        <a href=\"{{ base_url }}/products/subutai-blueprints\">Blueprints</a>
                        <a href=\"{{ base_url }}/products/khan\">KHAN</a>
                    </div>
                </div>
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">About <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                        <a href=\"{{ base_url }}/about/leadership\">Leadership</a>
                        <a href=\"{{ base_url }}/about/team\">Team</a>
                    </div>
                </div>
                <a href=\"{{ base_url }}/getting-started\">Getting Started</a>
                <a href=\"https://docs.subutai.io/\" target=\"_blank\">Documentation</a>
                <div class=\"dropdown\">
                    <button class=\"dropbtn\">Ideation <i class=\"fa fa-caret-down\"></i></button>
                    <div class=\"dropdown-content\">
                        <a href=\"#\">Blog</a>
                        <a href=\"#\">Hardware Security</a>
                        <a href=\"{{ base_url }}/ideation/p2p-cloud\">P2P Cloud</a>
                    </div>
                </div>
                <a href=\"{{ base_url }}/contact\">Contact</a>
                <a href=\"javascript:void(0);\" class=\"icon\" onclick=\"myFunction()\">&#9776;</a>
            </nav> #}
        </div>
    </div>
</header>", "partials/header.html.twig", "/Users/fernandoted/Sites/subutai/website/user/themes/subutai/templates/partials/header.html.twig");
    }
}
